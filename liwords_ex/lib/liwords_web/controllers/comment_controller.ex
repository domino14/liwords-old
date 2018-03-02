defmodule LIWordsWeb.CommentController do
  require Logger
  use LIWordsWeb, :controller
  import Ecto.Query

  alias LIWords.API
  alias LIWords.API.Comment
  alias LIWords.API.Game
  alias LIWords.Repo

  action_fallback LIWordsWeb.FallbackController

  def index(conn, %{"game_id" => game_uuid}) do
    game_id = get_game_fk(game_uuid)
    comments = get_comments(game_id)
    render(conn, "index.json", comments: comments)
  end

  def create(conn, %{"comment" => comment_params}) do
    user_id = conn.assigns.joken_claims["sub"]
    game_uuid = comment_params["game_id"]

    game_id = get_game_fk(game_uuid)

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

  def get_comments(game_id) do
    from(c in Comment, where: c.game_id == ^game_id, preload: :user)
      |> order_by(asc: :inserted_at)
      |> Repo.all
  end

  defp get_game_fk(uuid) do
    with {:ok, casted} <- Ecto.UUID.cast(uuid) do
      game = Repo.get_by(Game, uuid: casted)
      if !game do nil else game.id end
    else
      :error ->
        nil
    end
  end

  def update_comment(%Comment{} = comment, attrs) do
    comment
    |> Comment.changeset(Map.put(attrs, "edited", true))
    |> Repo.update()
  end

  def unpermitted_user(conn) do
    conn
    |> put_status(:forbidden)
    |> render(LIWordsWeb.ErrorView, :"403")
  end

  def update(conn, %{"id" => id, "comment" => commentText}) do
    user_id = conn.assigns.joken_claims["sub"]
    comment = Repo.get_by!(Comment, uuid: id)
    if comment.user_id != user_id do
      unpermitted_user(conn)
    else
      with {:ok, %Comment{} = comment} <- update_comment(comment,
          %{"comment" => commentText}) do
        render(conn, "show.json", comment: Repo.preload(comment, :user))
      end
    end
    # board = API.get_board!(id)

    # with {:ok, %Board{} = board} <- API.update_board(board, board_params) do
    #   render(conn, "show.json", board: board)
    # end
  end

  # def delete(conn, %{"id" => id}) do
  #   board = API.get_board!(id)
  #   with {:ok, %Board{}} <- API.delete_board(board) do
  #     send_resp(conn, :no_content, "")
  #   end
  # end

end
