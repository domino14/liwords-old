defmodule LIWordsWeb.Router do
  use LIWordsWeb, :router
  import Joken

  @jwt_secret Application.get_env(:liwords, :jwt_secret)

  pipeline :browser do
    plug :accepts, ["html"]
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Joken.Plug, verify: &LIWordsWeb.Router.verify_function/0
  end

  # anything using the following pipeline requires JWT, as do the API
  # functions.
  pipeline :browser_protected do
    plug :accepts, ["html"]
    plug Joken.Plug, verify: &LIWordsWeb.Router.verify_function/0
  end

  scope "/crosswords/api", LIWordsWeb do
    pipe_through :api
    resources "/boards", BoardController, except: [:new, :edit]
  end

  scope "/crosswords", LIWordsWeb do
    pipe_through :browser_protected
    post "/gcg_upload", GameController, :create_from_upload
  end

  # Since the following pipes through :browser instead of :browser_protected,
  # we don't require JWT for it.
  scope "/crosswords", LIWordsWeb do
    pipe_through :browser
    get "/", PageController, :index
  end

  scope "/crosswords", LIWordsWeb do
    pipe_through :browser
    resources "/game", GameController, only: [:show]
  end


  def verify_function() do
    %Joken.Token{}
    |> Joken.with_signer(hs256(@jwt_secret))
    |> Joken.with_json_module(Poison)
    |> Joken.with_validation("exp", &(&1 > current_time()))
    |> Joken.with_validation("iss", &(&1 == "aerolith.org"))
  end

end
