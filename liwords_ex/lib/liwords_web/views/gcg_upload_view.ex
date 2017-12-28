defmodule LIWordsWeb.GcgUploadView do
  use LIWordsWeb, :view
  alias LIWordsWeb.GcgUploadView

  # XXX: Consider renaming this GameView or similar.
  def render("show.json", %{game: game}) do
    %{data: render_one(game, GcgUploadView, "game.json", as: :game)}
  end

  def render("game.json", %{game: game}) do
    %{uuid: game.uuid,
      in_app: game.in_app,
      realm: game.realm,
      creator_id: game.creator_id}
  end

end
