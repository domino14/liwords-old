defmodule LIWords.APITest do
  use LIWords.DataCase

  alias LIWords.API

  describe "boards" do
    alias LIWords.API.Board

    @valid_attrs %{board_repr: "some board_repr", hash: "some hash", tiles_repr: "some tiles_repr"}
    @update_attrs %{board_repr: "some updated board_repr", hash: "some updated hash", tiles_repr: "some updated tiles_repr"}
    @invalid_attrs %{board_repr: nil, hash: nil, tiles_repr: nil}

    def board_fixture(attrs \\ %{}) do
      {:ok, board} =
        attrs
        |> Enum.into(@valid_attrs)
        |> API.create_board()

      board
    end

    test "list_boards/0 returns all boards" do
      board = board_fixture()
      assert API.list_boards() == [board]
    end

    test "get_board!/1 returns the board with given id" do
      board = board_fixture()
      assert API.get_board!(board.id) == board
    end

    test "create_board/1 with valid data creates a board" do
      assert {:ok, %Board{} = board} = API.create_board(@valid_attrs)
      assert board.board_repr == "some board_repr"
      assert board.hash == "some hash"
      assert board.tiles_repr == "some tiles_repr"
    end

    test "create_board/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = API.create_board(@invalid_attrs)
    end

    test "update_board/2 with valid data updates the board" do
      board = board_fixture()
      assert {:ok, board} = API.update_board(board, @update_attrs)
      assert %Board{} = board
      assert board.board_repr == "some updated board_repr"
      assert board.hash == "some updated hash"
      assert board.tiles_repr == "some updated tiles_repr"
    end

    test "update_board/2 with invalid data returns error changeset" do
      board = board_fixture()
      assert {:error, %Ecto.Changeset{}} = API.update_board(board, @invalid_attrs)
      assert board == API.get_board!(board.id)
    end

    test "delete_board/1 deletes the board" do
      board = board_fixture()
      assert {:ok, %Board{}} = API.delete_board(board)
      assert_raise Ecto.NoResultsError, fn -> API.get_board!(board.id) end
    end

    test "change_board/1 returns a board changeset" do
      board = board_fixture()
      assert %Ecto.Changeset{} = API.change_board(board)
    end
  end
end
