defmodule LIWordsWeb.BoardController do
  use LIWordsWeb, :controller

  alias LIWords.API
  alias LIWords.API.Board

  action_fallback LIWordsWeb.FallbackController

  def index(conn, _params) do
    boards = API.list_boards()
    render(conn, "index.json", boards: boards)
  end

  def create(conn, %{"board" => board_params}) do
    with {:ok, %Board{} = board} <- API.create_board(board_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", board_path(conn, :show, board))
      |> render("show.json", board: board)
    end
  end

  def show(conn, %{"id" => id}) do
    board = API.get_board!(id)
    render(conn, "show.json", board: board)
  end

  def update(conn, %{"id" => id, "board" => board_params}) do
    board = API.get_board!(id)

    with {:ok, %Board{} = board} <- API.update_board(board, board_params) do
      render(conn, "show.json", board: board)
    end
  end

  def delete(conn, %{"id" => id}) do
    board = API.get_board!(id)
    with {:ok, %Board{}} <- API.delete_board(board) do
      send_resp(conn, :no_content, "")
    end
  end
end
