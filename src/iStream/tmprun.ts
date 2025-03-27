import { DataPipelineFactory } from './interface';
import * as templates from './template'

function runPipeline(factory: DataPipelineFactory) {
    // 创建组件
    const input = factory.createInputHandler();
    const storage = factory.createStorageHandler();
    const processor = factory.createProcessor();
    const output = factory.createOutputHandler();
  
    // 执行流程
    const rawData = input.read();      // 输入
    storage.save(rawData);             // 存储
    const result = processor.process(rawData);  // 处理
    output.write(result);              // 输出
  }
  
  // 使用安全文件流水线
  runPipeline(new templates.SecureFilePipelineFactory());
  // 输出:
  // Saving "Data read from file" to database
  // Output: Encrypted(Data read from file)
  
  // 使用网络格式化流水线
  runPipeline(new templates.NetworkFormatPipelineFactory());
  // 输出:
  // Caching "Data read from network" in memory
  // Writing "Formatted: Data read from network" to file