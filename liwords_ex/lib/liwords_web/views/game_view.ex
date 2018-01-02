defmodule LIWordsWeb.GameView do
  use LIWordsWeb, :view
  alias LIWordsWeb.GameView

  def render("show.json", %{game: game}) do
    %{data: render_one(game, GameView, "game.json")}
  end

  def render("game.json", %{game: game}) do
    %{uuid: game.uuid,
      in_app: game.in_app,
      realm: game.realm,
      lexicon_id: game.lexicon_id,
      creator_id: game.creator_id}
  end

end
