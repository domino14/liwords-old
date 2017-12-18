defmodule LIWords.Crosswords.GCGTest do
  use ExUnit.Case

  alias LIWords.Crosswords.GCG

  test "fix_turn/2 ignores non-moves" do
    assert GCG.fix_turn(%{foo: "bar"}, :baz) == %{:foo => "bar"}
  end

  test "fix_turn/2 fixes the coords in a turn" do
    assert GCG.fix_turn(%{"rack" => "AEINRST", "pos" => "7F"}, :move) == %{
      "rack" => "AEINRST", "row" => 6, "col" => 5, "dir" => :h, "pos" => "7F"
    }

    assert GCG.fix_turn(%{"rack" => "AEINRST", "pos" => "j6"}, :move) == %{
      "rack" => "AEINRST", "row" => 5, "col" => 9, "dir" => :v, "pos" => "j6"
    }

    assert GCG.fix_turn(%{"rack" => "AEINRST", "pos" => "O15"}, :move) == %{
      "rack" => "AEINRST", "row" => 14, "col" => 14, "dir" => :v, "pos" => "O15"
    }

    assert GCG.fix_turn(%{"rack" => "AEINRST", "pos" => "15o"}, :move) == %{
      "rack" => "AEINRST", "row" => 14, "col" => 14, "dir" => :h, "pos" => "15o"
    }

    assert GCG.fix_turn(%{"rack" => "AEINRST", "pos" => "1A"}, :move) == %{
      "rack" => "AEINRST", "row" => 0, "col" => 0, "dir" => :h, "pos" => "1A"
    }

    assert GCG.fix_turn(%{"rack" => "AEINRST", "pos" => "13a"}, :move) == %{
      "rack" => "AEINRST", "row" => 12, "col" => 0, "dir" => :h, "pos" => "13a"
    }

  end
end
