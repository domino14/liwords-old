defmodule LIWordsWeb.GameController do
  use LIWordsWeb, :controller
  alias LIWords.Crosswords.GCG
  alias LIWords.API.Game
  alias LIWords.Repo

  def create_from_upload(conn, params) do
    # User id is in the claims.
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
      lexicon_id: nil,   # XXX Make a parameter.
      board_id: nil,
      user1_id: nil,
      user2_id: nil,
    }

    with {:ok, %Game{} = game} <- create_game(game_params) do
      conn
      |> put_status(:created)
      # Should make game.uuid a little prettier, use base64 version or
      # something
      |> put_resp_header("location", game_path(conn, :show, game.uuid))
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

  def show(conn, %{"id" => uuid}) do
    game = with {:ok, casted} <- Ecto.UUID.cast(uuid) do
      Repo.get_by(Game, uuid: uuid)
    else
      :error ->
        nil
    end

    if game != nil do
      conn
      |> put_layout(false)
      |> render(LIWordsWeb.PageView, "index.html", game: game, viewMode: "viewer",
          gameID: uuid)
    else
      # XXX: 404 JSON is not the best return page, but will fix later.
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(LIWordsWeb.ErrorView, "404.json")
    end
  end



end
