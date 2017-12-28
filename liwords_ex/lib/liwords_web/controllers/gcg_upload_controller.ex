defmodule LIWordsWeb.GcgUploadController do
  use LIWordsWeb, :controller
  alias LIWords.Crosswords.GCG

  def create(conn, params) do
    # User id is in the claims.
    IO.inspect conn.assigns.joken_claims
    converted = if upload = params["file"] do
      GCG.parse_file(upload.path)
    else
      nil
    end

    render(conn, "result.json", converted)

  end
end
