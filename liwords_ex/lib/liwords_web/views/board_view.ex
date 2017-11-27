defmodule LIWordsWeb.BoardView do
  use LIWordsWeb, :view
  alias LIWordsWeb.BoardView

  def render("index.json", %{boards: boards}) do
    %{data: render_many(boards, BoardView, "board.json")}
  end

  def render("show.json", %{board: board}) do
    %{data: render_one(board, BoardView, "board.json")}
  end

  def render("board.json", %{board: board}) do
    %{id: board.id,
      board_repr: board.board_repr,
      tiles_repr: board.tiles_repr,
      hash: board.hash}
  end
end
