# Getting Started with CUDA Programming

CUDA (Compute Unified Device Architecture) is NVIDIA's parallel computing platform and programming model that enables dramatic performance increases by harnessing the power of GPUs. In this comprehensive guide, we'll explore the fundamentals of CUDA programming and learn how to write efficient parallel code.

## Understanding GPU Architecture

Modern GPUs contain thousands of cores designed to handle multiple tasks simultaneously. Unlike CPUs with a few powerful cores optimized for sequential processing, GPUs excel at parallel workloads.

### Key Concepts

- **Streaming Multiprocessors (SMs)**: The building blocks of GPU architecture
- **CUDA Cores**: Individual processing units within SMs
- **Warps**: Groups of 32 threads that execute in lockstep
- **Thread Hierarchy**: Grids → Blocks → Threads

## Memory Hierarchy

Understanding CUDA's memory hierarchy is crucial for performance optimization:

```cuda
// Global Memory - Slowest but largest
__global__ void kernel(float* d_data) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    d_data[idx] = idx;
}

// Shared Memory - Fast, limited per block
__global__ void optimizedKernel(float* d_data) {
    __shared__ float s_data[256];
    int idx = threadIdx.x;

    s_data[idx] = d_data[idx];
    __syncthreads();

    // Process shared data
}
```

### Memory Types

1. **Global Memory**: Accessible by all threads, slowest
2. **Shared Memory**: Shared within a block, very fast
3. **Registers**: Fastest, private to each thread
4. **Constant Memory**: Read-only, cached
5. **Texture Memory**: Optimized for 2D spatial locality

## Writing Your First CUDA Kernel

Let's implement a simple vector addition kernel:

```cuda
__global__ void vectorAdd(float* A, float* B, float* C, int N) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < N) {
        C[idx] = A[idx] + B[idx];
    }
}

int main() {
    int N = 1 << 20; // 1M elements
    size_t size = N * sizeof(float);

    // Allocate device memory
    float *d_A, *d_B, *d_C;
    cudaMalloc(&d_A, size);
    cudaMalloc(&d_B, size);
    cudaMalloc(&d_C, size);

    // Copy data to device
    cudaMemcpy(d_A, h_A, size, cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, h_B, size, cudaMemcpyHostToDevice);

    // Launch kernel
    int threadsPerBlock = 256;
    int blocksPerGrid = (N + threadsPerBlock - 1) / threadsPerBlock;
    vectorAdd<<<blocksPerGrid, threadsPerBlock>>>(d_A, d_B, d_C, N);

    // Copy result back
    cudaMemcpy(h_C, d_C, size, cudaMemcpyDeviceToHost);

    // Cleanup
    cudaFree(d_A);
    cudaFree(d_B);
    cudaFree(d_C);

    return 0;
}
```

## Performance Optimization Techniques

### 1. Memory Coalescing

Access global memory in a coalesced pattern for maximum bandwidth:

```cuda
// Good: Coalesced access
int idx = threadIdx.x + blockIdx.x * blockDim.x;
data[idx] = value;

// Bad: Strided access
int idx = threadIdx.x * stride + blockIdx.x * blockDim.x;
data[idx] = value;
```

### 2. Occupancy Optimization

Maximize SM utilization by tuning block size and shared memory usage:

```cuda
// Use CUDA Occupancy Calculator to find optimal block size
__global__ void __launch_bounds__(256, 8)
optimizedKernel(float* data) {
    // Kernel code
}
```

### 3. Avoiding Bank Conflicts

Structure shared memory accesses to avoid bank conflicts:

```cuda
__shared__ float shared[256];

// Avoid: Bank conflicts
shared[threadIdx.x * 2] = data[idx];

// Better: Padding to avoid conflicts
__shared__ float shared[256 + 32]; // Add padding
```

## Advanced Topics

### Streams and Asynchronous Execution

Overlap computation and data transfer:

```cuda
cudaStream_t stream;
cudaStreamCreate(&stream);

cudaMemcpyAsync(d_A, h_A, size, cudaMemcpyHostToDevice, stream);
kernel<<<grid, block, 0, stream>>>(d_A, d_B);
cudaMemcpyAsync(h_B, d_B, size, cudaMemcpyDeviceToHost, stream);

cudaStreamSynchronize(stream);
cudaStreamDestroy(stream);
```

### Unified Memory

Simplify memory management with unified memory:

```cuda
float* data;
cudaMallocManaged(&data, size);

kernel<<<grid, block>>>(data);
cudaDeviceSynchronize();

// Access from host
for (int i = 0; i < N; i++) {
    printf("%f ", data[i]);
}

cudaFree(data);
```

## Profiling and Debugging

Use NVIDIA's profiling tools to identify bottlenecks:

- **nvprof**: Command-line profiler
- **Nsight Compute**: Kernel profiling
- **Nsight Systems**: System-wide performance analysis
- **cuda-memcheck**: Memory error detection

```bash
nvprof ./myapp
ncu --set full -o profile ./myapp
```

## Common Pitfalls

1. **Race Conditions**: Use `__syncthreads()` for intra-block synchronization
2. **Memory Leaks**: Always free allocated device memory
3. **Incorrect Grid/Block Dimensions**: Ensure coverage of entire data
4. **Ignoring Error Checking**: Always check CUDA API return values

## Best Practices

- ✅ Minimize host-device data transfers
- ✅ Use shared memory for frequently accessed data
- ✅ Optimize occupancy and memory access patterns
- ✅ Profile your code to identify bottlenecks
- ✅ Use asynchronous operations when possible
- ✅ Check for errors after CUDA API calls

## Conclusion

CUDA programming unlocks the massive parallel processing power of GPUs. By understanding the architecture, memory hierarchy, and optimization techniques, you can achieve significant performance improvements for compute-intensive applications.

Start simple, profile your code, and iterate on optimizations. The journey to mastering CUDA is rewarding and opens up exciting possibilities in scientific computing, machine learning, and real-time graphics.

Happy parallel programming! 🚀
