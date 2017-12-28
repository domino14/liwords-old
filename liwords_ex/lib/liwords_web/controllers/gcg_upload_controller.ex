defmodule LIWordsWeb.GcgUploadController do
  use LIWordsWeb, :controller
  alias LIWords.Crosswords.GCG
  alias LIWords.Crosswords.Game
  alias LIWords.Repo

  def create(conn, params) do
    # User id is in the claims.
    # IO.inspect conn.assigns.joken_claims
    user_id = conn.assigns.joken_claims["sub"]

    converted = if upload = params["file"] do
      GCG.parse_file(upload.path)
    else
      nil
    end

    game_params = %{
      repr: converted,
      creator_id: user_id,
      going: false,
      in_app: false,
      realm: "Tournament game",
      board_id: nil,
      user1_id: nil,
      user2_id: nil,
    }

    IO.inspect game_params

    with {:ok, %Game{} = game} <- create_game(game_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", gcg_upload_path(conn, :show, game.uuid))
      |> render("show.json", game: game)
    else
      {:error, changeset} ->
        IO.puts(["There was an error: ", inspect changeset.errors])
        conn
        |> put_status(:bad_request)
        |> render(LIWordsWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def create_game(attrs \\ %{}) do
    # Auto-generate UUID.
    uuid = Ecto.UUID.generate()
    %Game{}
    |> Game.changeset(Map.put(attrs, :uuid, uuid))
    |> Repo.insert()
  end

end
