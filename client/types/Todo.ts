export enum TodoStatus {
  TODO = 0, // 待完成
  DONE = 1, // 未完成
}

export interface Todo {
  id: number; // 自增 id
  title: string; // 标题
  description?: string; // 具体内容
  status: TodoStatus; // 状态
}
