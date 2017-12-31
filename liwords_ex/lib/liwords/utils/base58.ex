defmodule Utils.Pow do
  require Integer

  def pow(_, 0), do: 1
  def pow(x, n) when Integer.is_odd(n), do: x * pow(x, n - 1)
  def pow(x, n) do
    result = pow(x, div(n, 2))
    result * result
  end
end


defmodule Utils.Base58 do
  # Note this code is MIT-licensed, from https://github.com/dougal/base58.ex
  # But I couldn't find it on Hex so I just copy it here. I've modified it
  # a little.
  @moduledoc """
  Documentation for Base58.
  """

  @base      58
  @alphabets %{
    flickr:  String.split("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", ~r{}, trim: true),
    bitcoin: String.split("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", ~r{}, trim: true),
    ripple:  String.split("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz", ~r{}, trim: true)
  }

  @doc """
  """
  def int_to_base58(integer, alphabet \\ :flickr)
  def int_to_base58(0, alphabet) do
    Enum.at(@alphabets[alphabet], 0)
  end
  def int_to_base58(integer, alphabet) do
    integer
    |> do_int_to_base58(alphabet)
    |> Enum.join
    |> String.reverse
  end

  defp do_int_to_base58(0, _) do
    []
  end
  defp do_int_to_base58(integer, alphabet) do
    index = rem(integer, @base)
    [ Enum.at(@alphabets[alphabet], index) | do_int_to_base58(div(integer - index, @base), alphabet)]
  end

  def base58_to_int(base58_string, alphabet \\ :flickr) do
    base58_string
    |> String.split(~r{}, trim: true)
    |> do_base58_to_string(alphabet)
  end

  defp do_base58_to_string([], _) do
    0
  end
  defp do_base58_to_string([ char | tail ], alphabet) do
    index_in_alphabet = Enum.find_index(@alphabets[alphabet], &(&1 == char))
    this_char_value = index_in_alphabet * Utils.Pow.pow(@base, length(tail))
    this_char_value + do_base58_to_string(tail, alphabet)
  end
end
