const loadConfig = () => {
  const { env } = process;

  console.log('env', env.DOCKER_ENV);

  const dbHost = env.DOCKER_ENV ? env.DOCKER_MARIADB_HOST : env.TYPEORM_HOST;
  const redisHost = env.DOCKER_ENV ? env.DOCKER_REDIS_HOST : env.REDIS_HOST;

  console.log('host', dbHost, redisHost);

  return {
    db: {
      database: env.TYPEORM_DATABASE,
      host: dbHost,
      port: parseInt(env.TYPEORM_PORT, 10) || 3306,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
    },
    redis: {
      host: redisHost,
      port: parseInt(env.REDIS_PORT) || 6379,
    },
  };
};

export default loadConfig;
