# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon):
# 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
# ARG VARIANT=16-bullseye
ARG VARIANT=18-bullseye

# https://github.com/microsoft/vscode-dev-containers/tree/main/containers/typescript-node#readme
# FROM mcr.microsoft.com/devcontainers/typescript-node:0-${VARIANT}
FROM mcr.microsoft.com/vscode/devcontainers/php:${VARIANT}

ARG NODE_VERSION="none"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

# Uncomment this section to install additional OS packages.
ENV DEBIAN_FRONTEND=noninteractive

RUN \
  apt-get update && \
  apt-get -y install --no-install-recommends \
  libpq-dev && \
  docker-php-ext-install pdo_pgsql

ARG USERNAME

# https://code.visualstudio.com/remote/advancedcontainers/avoid-extension-reinstalls
RUN \
  # Referred as volume (vscode-extensions) in docker-compose.yml
  mkdir -p /home/$USERNAME/.vscode-server/extensions && \
  chown -R $USERNAME /home/$USERNAME/.vscode-server

# Switch user from root to node
USER $USERNAME

RUN \
  npm install --global @antfu/ni npkill taze
