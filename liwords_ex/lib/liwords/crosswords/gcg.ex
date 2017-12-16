defmodule LIWords.Crosswords.GCG do

  def parse_file(filename) do
    stream = File.stream!(filename)
    parse_stream(stream)
  end

  @doc """
    Takes in a stream and parses it line by line.
  """
  def parse_stream(stream) do
    game_repr = %{}

    # Use a keyword list.
    patterns = [
      # #player2 cesar cesar
      player: ~r/#player(?<p_number>[1-2])\s+(?<nick>\S+)\s+(?<real_name>.+)/,
      # >leesa: GNRUW 8D WRUNG +26 26
      move: ~r/>(?<nick>\S+):\s+(?<rack>\S+)\s+(?<pos>\w+)\s+(?<play>[\w\\.]+)\s+\+(?<score>\d+)\s+(?<cumul>\d+)/,
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
      # #note aww i should find tarnished :(
      note: ~r/#note (?<note>.+)/
    ]

    parser = fn line ->
      Enum.find_value(patterns,
        fn {key, pattern} ->
          with captures when is_map(captures) <- Regex.named_captures(pattern, line) do
            # notes can be multiline, but everything else should fit on one
            # line. Use a simple state machine for multiline notes.

            {key, captures}
          end
        end
      )
    end

    Enum.map(stream, parser)
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
