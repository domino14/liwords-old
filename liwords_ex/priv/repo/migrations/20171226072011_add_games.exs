defmodule LIWords.Repo.Migrations.AddGames do
  use Ecto.Migration

  def change do
    create table(:games, prefix: "crosswords") do
      add :uuid, :uuid
      add :going, :boolean
      add :in_app, :boolean
      add :repr, :map
      add :realm, :string

      add :board_id, references(:boards)
      add :creator_id, :id
      add :user1_id, :id
      add :user2_id, :id

      timestamps()
    end

    create index("games", [:uuid], prefix: "crosswords")

    execute """
    alter table crosswords.games
      add constraint fk_games_creator
      foreign key (creator_id)
      references public.auth_user(id),

      add constraint fk_games_user1
      foreign key (user1_id)
      references public.auth_user(id),

      add constraint fk_games_user2
      foreign key (user2_id)
      references public.auth_user(id);

    """

  end
end
