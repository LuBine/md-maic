import * as oe from './interface';


// 文件输入
export class FileInputHandler implements oe.InputHandler {
    read(): string {
      return "Data read from file";
    }
  }

// 网络输入
export class NetworkInputHandler implements oe.InputHandler {
    read(): string {
        return "Data read from network";
    }
}

// 数据库存储
export class DatabaseStorageHandler implements oe.StorageHandler {
    save(data: string): void {
      console.log(`Saving "${data}" to database`);
    }
  }
  
// 内存存储
export class MemoryStorageHandler implements oe.StorageHandler {
    save(data: string): void {
        console.log(`Caching "${data}" in memory`);
    }
}

// 加密处理
export class EncryptionProcessor implements oe.Processor {
    process(data: string): string {
      return `Encrypted(${data})`;
    }
  }
  
// 格式化处理
export class FormatProcessor implements oe.Processor {
    process(data: string): string {
        return `Formatted: ${data}`;
    }
}

// 控制台输出
export class ConsoleOutputHandler implements oe.OutputHandler {
    write(result: string): void {
      console.log(`Output: ${result}`);
    }
  }
  
// 文件输出
export class FileOutputHandler implements oe.OutputHandler {
    write(result: string): void {
        console.log(`Writing "${result}" to file`);
    }
}