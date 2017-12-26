defmodule LIWords.Crosswords.Game do
  use Ecto.Schema
  import Ecto.Changeset
  alias LIWords.Crosswords.Game

  @schema_prefix "crosswords"   # Use the `crosswords` schema.
  schema "games" do

    field :uuid, Ecto.UUID
    field :going, :boolean  # Is the game still going on?
    field :in_app, :boolean  # Created within the app (true), or outside (false).
    field :repr, :map  # This is a JSON representation of the game; an
                       # enhancement over the GCG input format.
                       # For more details, see gcg.ex.
    field :realm, :string  # More details about where game was played.
                           # See `:in_app`
    # Winners later? Etc?
    belongs_to :board, LIWords.API.Board
    belongs_to :creator, LIWords.User  # The original uploader or creator
    belongs_to :user1, LIWords.User    # Player 1 - nullable
    belongs_to :user2, LIWords.User    # Player 2 - nullable

    timestamps()
  end

  @doc false
  def changeset(%Game{} = game, attrs) do
    game
    |> cast(attrs, [:repr, :in_app, :realm, :creator, :board, :user1, :user2])
    |> validate_required([:repr, :creator])
  end
end
