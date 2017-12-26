defmodule LIWords.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias LIWords.User

  # This uses the Aerolith database by default. All other tables
  # for crosswords should use their own crosswords schema.
  schema "auth_user" do
    field :email, :string
    field :username, :string

  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:username, :email])
    |> validate_required([:username, :email])
  end
end
