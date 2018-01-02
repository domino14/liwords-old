defmodule LIWordsWeb.CommentController do
  require Logger
  use LIWordsWeb, :controller
  import Ecto.Query

  alias LIWords.API
  alias LIWords.API.Comment
  alias LIWords.API.Game
  alias LIWords.Repo

  action_fallback LIWordsWeb.FallbackController

  def create(conn, %{"comment" => comment_params}) do
    user_id = conn.assigns.joken_claims["sub"]
    game_uuid = comment_params["game_id"]

    game_id = with {:ok, casted} <- Ecto.UUID.cast(game_uuid) do
      game = Repo.get_by(Game, uuid: game_uuid)
      if !game do nil else game.id end
    else
      :error ->
        nil
    end

    with {:ok, %Comment{} = comment} <- create_comment(
        Map.merge(comment_params, %{"user_id" => user_id, "game_id" => game_id})) do

      full_comment = Repo.preload(comment, :user)

      conn
      |> put_status(:created)
      |> put_resp_header("location", comment_path(conn, :show, full_comment))
      |> render("show.json", comment: full_comment)
    end
  end

  def create_comment(attrs \\ %{}) do
    uuid = Ecto.UUID.generate()
    %Comment{}
    |> Comment.changeset(Map.put(attrs, "uuid", uuid))
    |> Repo.insert()
  end


  # def update(conn, %{"id" => id, "board" => board_params}) do
  #   board = API.get_board!(id)

  #   with {:ok, %Board{} = board} <- API.update_board(board, board_params) do
  #     render(conn, "show.json", board: board)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   board = API.get_board!(id)
  #   with {:ok, %Board{}} <- API.delete_board(board) do
  #     send_resp(conn, :no_content, "")
  #   end
  # end

end
