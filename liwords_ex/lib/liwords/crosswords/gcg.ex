defmodule LIWords.Crosswords.GCG do

  def parse_file(filename) do
    stream = File.stream!(filename)
    parse_stream(stream)
  end

  @doc """
    Takes in a stream and parses it line by line.
  """
  def parse_stream(stream) do
    Enum.map(stream, fn x -> IO.puts x end)
  end

  @doc """
    Parses the bytes from a GCG file into a JSON format that our front
    end can understand. Assumes the contents of the GCG file are in the
    bytes parameter.
  """
  def parse(bytes) do
    {:ok, device} = bytes |> StringIO.open()
    # XXX: IO.binstream apparently is Unicode-unsafe.
    parse_stream(IO.binstream(device, :line))

  end
end
