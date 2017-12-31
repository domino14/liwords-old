defmodule LIWords.API.GameTest do
  use ExUnit.Case

  alias LIWords.API.Game

  test "uuid_to_short_id/1 converts uuid" do
    assert Game.uuid_to_short_id("4c71247d-91d6-425a-8c7b-bb97135eba1e") == "aru5dd61xy49yPcmfezJed"
  end

  test "short_id_to_uuid/1 converts short uuid" do
    assert Game.short_id_to_uuid("aru5dd61xy49yPcmfezJed") == {:ok, "4c71247d-91d6-425a-8c7b-bb97135eba1e"}
  end
end
