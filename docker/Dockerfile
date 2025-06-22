###################################################
# Stage: base
# 
# This base stage ensures all other stages are using the same base image
# and provides common configuration for all stages, such as the working dir.
###################################################
FROM node:20 AS base
WORKDIR /usr/local/app

###################################################
################  BACKEND STAGES  #################
###################################################

###################################################
# Stage: backend-base
#
# This stage is used as the base for the backend-dev and test stages, since
# there are common steps needed for each.
###################################################
FROM base AS development
RUN cd ..
COPY . .
RUN npm i
CMD ["npm", "run", "dev"]

FROM base AS staging
RUN cd ..
COPY . .
RUN npm i
CMD ["npm", "run", "stag"]

FROM base AS production
RUN cd ..
COPY . .
RUN npm i
CMD ["npm", "run", "prod"]