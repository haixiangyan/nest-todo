export enum TodoStatus {
  TODO = 0, // 待完成
  DONE = 1, // 未完成
}

export interface TodoItem {
  id: number; // 自增 id
  title: string; // 标题
  description?: string; // 具体内容
  media?: string; // 资源链接
  status: TodoStatus; // 状态
}
