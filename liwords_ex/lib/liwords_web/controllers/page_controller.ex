defmodule LIWordsWeb.PageController do
  use LIWordsWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html", game: %{}, viewMode: "default")
  end
end
