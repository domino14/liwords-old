defmodule LIWords.Repo.Migrations.AddEditedToComments do
  use Ecto.Migration

  def change do
    alter table(:phx_crosswords_comments) do
      add :edited, :boolean, null: false, default: false
    end
  end
end
