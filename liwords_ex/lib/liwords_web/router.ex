defmodule LIWordsWeb.Router do
  use LIWordsWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", LIWordsWeb do
    pipe_through :api
  end
end
