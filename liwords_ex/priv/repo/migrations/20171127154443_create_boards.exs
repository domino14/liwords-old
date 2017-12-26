defmodule LIWords.Repo.Migrations.CreateBoards do
  use Ecto.Migration

  def change do
    create table(:boards, prefix: "crosswords") do
      add :board_repr, :text
      add :tiles_repr, :text
      add :hash, :string
      add :user_id, :id

      timestamps()
    end

    # Ecto does not seem to support creating a cross-schema reference.
    # We are placing any tables created by this app inside a special
    # `crosswords` schema to maintain some semblance of separation,
    # but we need to reference the user table.
    execute """
    alter table crosswords.boards
      add constraint fk_boards_users
      foreign key (user_id)
      references public.auth_user(id)
    """

  end
end
