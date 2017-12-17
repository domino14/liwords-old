defmodule LIWords.Crosswords.GCG do
  @regex_patterns [
      # #player2 cesar cesar
      player: ~r/#player(?<p_number>[1-2])\s+(?<nick>\S+)\s+(?<real_name>.+)/,
      # >leesa: GNRUW 8D WRUNG +26 26
      move: ~r/>(?<nick>\S+):\s+(?<rack>\S+)\s+(?<pos>\w+)\s+(?<play>[\w\\.]+)\s+\+(?<score>\d+)\s+(?<cumul>\d+)/,
      # #note aww i should find tarnished :(
      note: ~r/#note (?<note>.+)/,
      # `lost_challenge_regex` is taking back of a play after losing a
      # challenge on it
      # >leesa: ?CIOSTU --  -61 112
      lost_challenge: ~r/>(?<nick>\S+):\s+(?<rack>\S+)\s+--\s+-(?<lost_score>\d+)\s+(?<cumul>\d+)/,
      # Pass can also be used for a lost challenge the other way, that is,
      # challenging a valid play.
      # >leesa: ?CIOSTU -  +0 112
      pass: ~r/>(?<nick>\S+):\s+(?<rack>\S+)\s+-\s+\+0\s+(?<cumul>\d+)/,
      # Challenge bonus
      # >Joel: DROWNUG (challenge) +5 289
      challenge_bonus: ~r/>(?<nick>\S+):\s+(?<rack>\S+)\s+\(challenge\)\s+\+(?<bonus>\d+)\s+(?<cumul>\d+)/,
      # >howard: III -III +0 299
      exchange: ~r/>(?<nick>\S+):\s+(?<rack>\S+)\s+-(?<exchanged>\S+)\s+\+0\s+(?<cumul>\d+)/,
      # >howard:  (Q) +20 411
      end_rack_points: ~r/>(?<nick>\S+):\s+\((?<rack>\S+)\)\s+\+(?<score>\d+)\s+(?<cumul>\d+)/,
    ]

  def parse_file(filename) do
    stream = File.stream!(filename)
    parse_stream(stream)
  end

  defp line_pattern_not_found(line, game_repr) do
    # line didn't match, i.e. named_captures was nil. This could happen
    # with a multiline note (no other cases I know of atm, at least
    # for a properly formatted GCG)
    if game_repr[:state][:last_token] == :note do
      # Output for the next iteration.
      Map.put(game_repr[:state], :last_note,
        game_repr[:state][:last_note] <> line)
    else
      game_repr  # Output unchanged for next iteration. This could be a GCG
                 # parsing error?
    end
  end

  @doc """
  A helper function to parse a new turn. Makes use of the state
  in the game representation. Returns a new game_repr map for use in the
  reduce function that calls this.
  """
  defp parse_new_turn(parsed_turn, game_repr) do
    # We have either a new turn, or a new note/player definition.
    # If there is a last_note, wrap it into the last_turn and set last_note
    # to blank.
    state = game_repr[:state]
    last_turn = if state[:last_note] != "" do
      Map.put(state[:last_turn], :note, state[:last_note])
    else
      state[:last_turn]
    end

    # Append the last turn to the turns.
    turns = if last_turn do
      game_repr[:turns] ++ [last_turn]
    else
      game_repr[:turns]
    end

    # Now check the new turn.
    {last_token, turn_repr} = parsed_turn
    game_repr = case last_token do
      :player ->
        %{game_repr | players: game_repr[:players] ++ [turn_repr]}
      :note ->
        new_state = %{game_repr[:state] | last_note: turn_repr[:note]}
        %{game_repr | state: new_state}
      _ ->    # Everything else
        new_state = %{game_repr[:state] |
          last_turn: Map.put(turn_repr, :type, last_token)}
        %{game_repr | state: new_state}
    end
    %{game_repr | turns: turns}
  end

  def parse_line(line, game_repr) do
    # Use a keyword list.

    parsed = Enum.find_value(@regex_patterns,
      fn {key, pattern} ->
        with captures when is_map(captures) <- Regex.named_captures(pattern, line) do
          {key, captures}
        end
      end
    )
    IO.puts(inspect parsed)
    IO.puts(inspect game_repr)
    if is_nil(parsed) do
      line_pattern_not_found(line, game_repr)
    else
      parse_new_turn(parsed, game_repr)
    end
  end

  @doc """
    Takes in a stream and parses it line by line.
  """
  def parse_stream(stream) do
    game_repr = %{
      players: [],
      turns: [],
      state: %{
        last_note: "",
        last_token: nil,
        last_turn: nil
      },   # This is a temporary construct.
    }

    Enum.reduce(stream, game_repr, fn(line, game_repr) ->
      parse_line(line, game_repr)
    end)

    # Enum.map(stream, fn line ->
    #   parse_line(line, game_repr, "", nil, nil)
    # end)
    # # append the last turn
    # if last_turn do
    #   turns = turns ++ [last_turn]
    # end
    # {players, turns}
  end

  @doc """
    Parses the bytes from a GCG file into a JSON format that our front
    end can understand. Assumes the contents of the GCG file are in the
    bytes parameter.
  """
  def parse(bytes) do
    {:ok, device} = bytes |> StringIO.open()
    # XXX: IO.binstream apparently is Unicode-unsafe.
    parse_stream(IO.binstream(device, :line))

  end
end
