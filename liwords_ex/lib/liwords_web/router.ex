defmodule LIWordsWeb.Router do
  use LIWordsWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/crosswords/api", LIWordsWeb do
    pipe_through :api
    resources "/boards", BoardController, except: [:new, :edit]
  end

  scope "/crosswords", LIWordsWeb do
    pipe_through :browser

    get "/", PageController, :index

  end
end
