defmodule LIWordsWeb.GcgUploadView do
  use LIWordsWeb, :view

  def render("result.json", %{turns: turnz}) do
    turnz
  end

end
