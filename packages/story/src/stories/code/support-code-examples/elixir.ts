import { dedent } from "ts-dedent";
export const elixir = dedent`
defmodule ChatServer do
  def start(port \\ 4040) do
    {:ok, listen_socket} = :gen_tcp.listen(port, [:binary, active: false, reuseaddr: true])
    Logger.info("Chat server started on port #{port}")

    accept_loop(listen_socket)
  end

  def accept_loop(listen_socket) do
    {:ok, client_socket} = :gen_tcp.accept(listen_socket)
    spawn(fn -> handle_client(client_socket) end)
    accept_loop(listen_socket)
  end

  def handle_client(client_socket) do
    {:ok, message} = :gen_tcp.recv(client_socket, 0)
    Logger.info("Received message from client: #{message}")
    broadcast(message)

    handle_client(client_socket)
  end

  def broadcast(message) do
    :inet.getaddr("localhost") |> Tuple.to_list() |> List.delete_at(-1) |> Enum.join(".") |> IO.puts(message)
  end
end
`;
