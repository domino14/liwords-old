defmodule LIWords.API.Game do
  use Ecto.Schema
  import Ecto.Changeset
  alias LIWords.API.Game

  schema "phx_crosswords_games" do

    field :uuid, Ecto.UUID
    field :going, :boolean  # Is the game still going on?
    field :in_app, :boolean  # Created within the app (true), or outside (false).
    field :repr, :map  # This is a JSON representation of the game; an
                       # enhancement over the GCG input format.
                       # For more details, see gcg.ex.
    field :realm, :string  # More details about where game was played.
                           # See `:in_app`
    # These fields are used for uploaded games, in which the nicknames
    # might not match any users currently in the system.
    field :user1_nick, :string
    field :user2_nick, :string
    # Winners later? Etc?
    belongs_to :lexicon, LIWords.Lexicon
    belongs_to :board, LIWords.API.Board
    belongs_to :creator, LIWords.User  # The original uploader or creator
    belongs_to :user1, LIWords.User    # Player 1 - nullable
    belongs_to :user2, LIWords.User    # Player 2 - nullable

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(%Game{} = game, attrs) do
    game
    |> cast(attrs, [:repr, :in_app, :realm, :creator_id, :board_id, :user1_id,
            :user2_id, :uuid, :going, :lexicon_id, :user1_nick, :user2_nick])
    |> validate_required([:repr, :creator_id, :uuid])
  end

  @doc
  """
  Convert the given Ecto.uuid to a short uuid.
  """
  def uuid_to_short_id(uuid) do
    {:ok, bin} = Ecto.UUID.dump(uuid)
    bl = :binary.bin_to_list(bin)
    y = Enum.reduce(bl, {0, 15}, fn (x, acc) ->
      exponent = elem(acc, 1)
      multiplier = Utils.Pow.pow(256, exponent)
      {elem(acc, 0) + (x * multiplier), exponent - 1} end)
    Utils.Base58.int_to_base58(elem(y, 0))
  end

  def short_id_to_uuid(shortid) do
    toint = Utils.Base58.base58_to_int(shortid)
    Ecto.UUID.cast(<< toint:: 128 >>)
  end
end
