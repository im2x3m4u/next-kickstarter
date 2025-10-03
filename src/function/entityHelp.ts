import { getConnection } from "../lib/typeorm";
import { DeepPartial, EntityTarget } from "typeorm";
import { encryptPassword } from "@/lib/crypto";

// Get All (pagination + search)
export async function getAllEntities<T>(
  entityClass: EntityTarget<T>,
  page: number = 1,
  pageSize: number = 10,
  orderField: keyof T = "created_at" as keyof T,
  sortOrder: "ASC" | "DESC" = "ASC",
  searchField?: keyof T,
  search?: string,
  relations: string[] = [],
  searchInRelation?: { relation: string; column: string; value: string }
) {
  const ds = await getConnection();
  const repo = ds.getRepository(entityClass);

  // fallback kalau NaN
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
  const safePageSize = Number.isNaN(pageSize) || pageSize < 1 ? 10 : pageSize;

  const qb = repo
    .createQueryBuilder("t")
    .orderBy(`t.${String(orderField)}`, "ASC")
    .skip((safePage - 1) * safePageSize)
    .take(safePageSize);

  // Tambahkan relations jika ada
  relations.forEach((rel) => {
    qb.leftJoinAndSelect(`t.${rel}`, rel);
  });

  // Search di relasi
  if (searchInRelation?.value) {
    qb.andWhere(
      `${searchInRelation.relation}.${searchInRelation.column} LIKE :search`,
      { search: `%${searchInRelation.value}%` }
    );
  }
    // Search di entity
  if (search && searchField) {
    qb.andWhere(`t.${String(searchField)} LIKE :search`, { search: `%${search}%` });
  }
  // Sorting
  qb.orderBy(`t.${String(orderField)}`, sortOrder);

  // Pagination
  qb.skip((safePage - 1) * safePageSize).take(safePageSize);

  const [data, total] = await qb.getManyAndCount();

  return {
    ok: true,
    data,
    pagination: {
      total,
      page: safePage,
      pageSize: safePageSize,
      totalPages: Math.ceil(total / safePageSize),
    },
  };
}

// Get By Id
export async function getEntityById<T>(
  entityClass: EntityTarget<T>,
  idField: keyof T,
  id: string,
  relations: string[] = []
) {
  const ds = await getConnection();
  const repo = ds.getRepository(entityClass);

  const entity = await repo.findOne({
    where: { [idField]: id } as any,
    relations,
  });

  return { ok: !!entity, data: entity };
}

// Create
export async function createEntity<T>(
  entityClass: EntityTarget<T>,
  data: Partial<T>
): Promise<{ ok: true; data: T }> {
  const ds = await getConnection();
  const repo = ds.getRepository<T>(entityClass);

  const entity = repo.create(data as DeepPartial<T>);
  const saved = await repo.save(entity);

  return { ok: true, data: saved as T };
}

// Update By Id
export async function updateEntityById<T>(
  entityClass: EntityTarget<T>,
  idField: keyof T,
  id: string,
  data: Partial<T>
) {
  const ds = await getConnection();
  const repo = ds.getRepository(entityClass);

  const entity = await repo.findOne({ where: { [idField]: id } as any });
  if (!entity) return { ok: false, data: null };

  if ("password" in data && data.password) {
    (data as any).password = encryptPassword((data as any).password);
  }

  if ("password" in data && !(data as any).password) {
    delete (data as any).password;
  }

  repo.merge(entity, data as any);
  const updated = await repo.save(entity);

  return { ok: true, data: updated };
}

// Delete By Id
export async function deleteEntityById<T>(
  entityClass: EntityTarget<T>,
  idField: keyof T,
  id: string
) {
  const ds = await getConnection();
  const repo = ds.getRepository(entityClass);

  const entity = await repo.findOne({ where: { [idField]: id } as any });
  if (!entity) return { ok: false };

  await repo.remove(entity);
  return { ok: true };
}
