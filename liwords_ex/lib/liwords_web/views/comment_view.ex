defmodule LIWordsWeb.CommentView do
  use LIWordsWeb, :view
  alias LIWordsWeb.CommentView

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{uuid: comment.uuid,
      comment: comment.comment,
      turn_num: comment.turn_num,
      user_id: comment.user.username,
      created: comment.inserted_at,
      }
  end

end
