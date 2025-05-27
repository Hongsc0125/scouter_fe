import { MongoClient, ServerApiVersion } from 'mongodb';

// 필수 환경 변수 검증
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(`다음 환경 변수들이 설정되어 있지 않습니다: ${missingVars.join(', ')}`);
}

const { 
  DB_USER, 
  DB_PASSWORD, 
  DB_HOST, 
  DB_PORT, 
  DB_NAME 
} = process.env;

// MongoDB 연결 문자열 구성
const uri = `mongodb://${DB_USER}:${encodeURIComponent(DB_PASSWORD!)}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin&retryWrites=true`;

console.log('MongoDB 연결 정보:');
console.log(`- 호스트: ${DB_HOST}`);
console.log(`- 포트: ${DB_PORT}`);
console.log(`- 데이터베이스: ${DB_NAME}`);
console.log(`- 사용자: ${DB_USER}`);

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // 개발 환경에서는 전역 변수를 사용하여 연결을 재사용합니다.
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // 프로덕션 환경에서는 새 연결을 생성합니다.
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  clientPromise = client.connect();
}

export default clientPromise;
