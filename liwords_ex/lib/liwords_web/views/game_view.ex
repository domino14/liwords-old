defmodule LIWordsWeb.GameView do
  use LIWordsWeb, :view
  alias LIWordsWeb.GameView

  def render("show.json", %{game: game}) do
    %{data: render_one(game, GameView, "game.json")}
  end

  def render("index.json", %{games: games, total_games: total_games}) do
    %{data: render_many(games, GameView, "game_index.json"),
      total_games: total_games
    }
  end

  def render("game.json", %{game: game}) do
    %{uuid: game.uuid,
      in_app: game.in_app,
      realm: game.realm,
      lexicon_id: game.lexicon_id,
      creator_id: game.creator_id}
  end

  def render("game_index.json", %{game: game}) do
    %{uuid: game.uuid,
      user1: game.user1_nick,
      user2: game.user2_nick,
      date: game.inserted_at}
  end

end
