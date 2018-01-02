defmodule LIWords.Lexicon do
  use Ecto.Schema
  import Ecto.Changeset
  alias LIWords.Lexicon

  # This uses the Aerolith Django database model by default.

  schema "base_lexicon" do
    field :lexiconName, :string

  end

end
