FROM elixir:alpine
MAINTAINER Cesar Del Solar <delsolar@gmail.com>

COPY . /opt/liwords/
WORKDIR /opt/liwords/liwords_ex/

EXPOSE 4000
RUN mix local.hex --force
RUN mix local.rebar --force

# Run command in exec form because /bin/sh does not pass signals to its children.
CMD ["mix", "do", "deps.get", ",", "phx.server"]
