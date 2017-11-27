defmodule LIWords.API.Board do
  use Ecto.Schema
  import Ecto.Changeset
  alias LIWords.API.Board


  schema "boards" do
    field :board_repr, :string
    field :hash, :string
    field :tiles_repr, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(%Board{} = board, attrs) do
    board
    |> cast(attrs, [:board_repr, :tiles_repr, :hash])
    |> validate_required([:board_repr, :tiles_repr, :hash])
  end
end
