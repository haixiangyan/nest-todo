export enum TodoStatus {
  TODO = 0, // 待完成
  DONE = 1, // 未完成
}

export interface Todo {
  title: string; // 标题
  id?: number; // 自增 id
  description?: string; // 具体内容
  status: TodoStatus; // 状态
}
