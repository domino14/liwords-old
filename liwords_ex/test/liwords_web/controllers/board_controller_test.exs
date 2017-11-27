defmodule LIWordsWeb.BoardControllerTest do
  use LIWordsWeb.ConnCase

  alias LIWords.API
  alias LIWords.API.Board

  @create_attrs %{board_repr: "some board_repr", hash: "some hash", tiles_repr: "some tiles_repr"}
  @update_attrs %{board_repr: "some updated board_repr", hash: "some updated hash", tiles_repr: "some updated tiles_repr"}
  @invalid_attrs %{board_repr: nil, hash: nil, tiles_repr: nil}

  def fixture(:board) do
    {:ok, board} = API.create_board(@create_attrs)
    board
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all boards", %{conn: conn} do
      conn = get conn, board_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create board" do
    test "renders board when data is valid", %{conn: conn} do
      conn = post conn, board_path(conn, :create), board: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, board_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "board_repr" => "some board_repr",
        "hash" => "some hash",
        "tiles_repr" => "some tiles_repr"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, board_path(conn, :create), board: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update board" do
    setup [:create_board]

    test "renders board when data is valid", %{conn: conn, board: %Board{id: id} = board} do
      conn = put conn, board_path(conn, :update, board), board: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, board_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "board_repr" => "some updated board_repr",
        "hash" => "some updated hash",
        "tiles_repr" => "some updated tiles_repr"}
    end

    test "renders errors when data is invalid", %{conn: conn, board: board} do
      conn = put conn, board_path(conn, :update, board), board: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete board" do
    setup [:create_board]

    test "deletes chosen board", %{conn: conn, board: board} do
      conn = delete conn, board_path(conn, :delete, board)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, board_path(conn, :show, board)
      end
    end
  end

  defp create_board(_) do
    board = fixture(:board)
    {:ok, board: board}
  end
end
