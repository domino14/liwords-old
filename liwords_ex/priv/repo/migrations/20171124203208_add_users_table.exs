defmodule LIWords.Repo.Migrations.AddUsersTable do
  use Ecto.Migration

  def change do
    # This should be a fake migration, for test purposes only. In the real
    # app, auth_user already exists in the public schema, and it's a Django
    # data model.
    if Mix.env == :test do
      create table(:auth_user) do
        add :email, :string
        add :username, :string
      end
    end
  end
end
