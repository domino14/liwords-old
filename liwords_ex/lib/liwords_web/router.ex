defmodule LIWordsWeb.Router do
  use LIWordsWeb, :router
  import Joken

  @jwt_secret Application.get_env(:liwords, :jwt_secret)

  pipeline :browser_unprotected do
    plug :accepts, ["html"]
  end

  pipeline :api_protected do
    plug :accepts, ["json"]
    if Mix.env != :test do
      plug Joken.Plug, verify: &LIWordsWeb.Router.verify_function/0
    end
  end

  pipeline :api_unprotected do
    plug :accepts, ["json"]
  end

  # anything using the following pipeline requires JWT, as do the API
  # functions.
  pipeline :browser_protected do
    plug :accepts, ["html"]
    plug Joken.Plug, verify: &LIWordsWeb.Router.verify_function/0
  end

  scope "/crosswords/api", LIWordsWeb do
    pipe_through :api_protected
    resources "/boards", BoardController, except: [:new, :edit]
    resources "/comments", CommentController, except: [:new, :edit, :show, :index]
  end

  scope "/crosswords/api", LIWordsWeb do
    pipe_through :api_unprotected
    resources "/comments", CommentController, only: [:show, :index]
    resources "/games", GameController, only: [:index]
  end

  scope "/crosswords", LIWordsWeb do
    pipe_through :browser_protected
    post "/gcg_upload", GameController, :create_from_upload
  end

  # Since the following pipes through :browser instead of :browser_protected,
  # we don't require JWT for it.
  scope "/crosswords", LIWordsWeb do
    pipe_through :browser_unprotected
    get "/", PageController, :index
  end

  scope "/crosswords", LIWordsWeb do
    pipe_through :browser_unprotected
    resources "/games", GameController, only: [:show]
  end


  def verify_function() do
    %Joken.Token{}
    |> Joken.with_signer(hs256(@jwt_secret))
    |> Joken.with_json_module(Poison)
    |> Joken.with_validation("exp", &(&1 > current_time()))
    |> Joken.with_validation("iss", &(&1 == "aerolith.org"))
  end

end
