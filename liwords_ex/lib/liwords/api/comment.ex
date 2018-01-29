defmodule LIWords.API.Comment do
  use Ecto.Schema
  import Ecto.Changeset
  alias LIWords.API.Comment

  schema "phx_crosswords_comments" do
    field :uuid, Ecto.UUID
    field :comment, :string
    field :turn_num, :integer
    field :edited, :boolean, default: false, null: false

    belongs_to :user, LIWords.User
    belongs_to :game, LIWords.API.Game
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(%Comment{} = comment, attrs) do
    comment
    |> cast(attrs, [:uuid, :comment, :turn_num, :user_id, :game_id])
    |> validate_required([:uuid, :comment, :turn_num, :user_id, :game_id])
  end
end
