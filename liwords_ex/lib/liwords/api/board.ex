defmodule LIWords.API.Board do
  use Ecto.Schema
  import Ecto.Changeset
  alias LIWords.API.Board

  @schema_prefix "crosswords"   # Use the `crosswords` schema.
  schema "boards" do
    field :board_repr, :string
    field :hash, :string
    field :tiles_repr, :string
    belongs_to :user, LIWords.User

    timestamps()
  end

  @doc false
  def changeset(%Board{} = board, attrs) do
    board
    |> cast(attrs, [:board_repr, :tiles_repr, :hash])
    |> validate_required([:board_repr, :tiles_repr, :hash])
  end
end
