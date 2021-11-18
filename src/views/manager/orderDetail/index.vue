<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="订单ID" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="费用ID" prop="feeId">
        <el-input
          v-model="queryParams.feeId"
          placeholder="请输入费用ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专利申请号" prop="applyId">
        <el-input
          v-model="queryParams.applyId"
          placeholder="请输入专利申请号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专利名称" prop="applyName">
        <el-input
          v-model="queryParams.applyName"
          placeholder="请输入专利名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="每单应缴消费" prop="money">
        <el-input
          v-model="queryParams.money"
          placeholder="请输入每单应缴消费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="费用描述" prop="description">
        <el-input
          v-model="queryParams.description"
          placeholder="请输入费用描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="快递单号" prop="expressNum">
        <el-input
          v-model="queryParams.expressNum"
          placeholder="请输入快递单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否付款" prop="isPay">
        <el-input
          v-model="queryParams.isPay"
          placeholder="请输入是否付款"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款日期" prop="payDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.payDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择付款日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['manager:orderDetail:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['manager:orderDetail:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['manager:orderDetail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['manager:orderDetail:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="orderDetailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="订单ID" align="center" prop="orderId" />
      <el-table-column label="费用ID" align="center" prop="feeId" />
      <el-table-column label="专利申请号" align="center" prop="applyId" />
      <el-table-column label="专利名称" align="center" prop="applyName" />
      <el-table-column label="每单应缴消费" align="center" prop="money" />
      <el-table-column label="费用描述" align="center" prop="description" />
      <el-table-column label="快递单号" align="center" prop="expressNum" />
      <el-table-column label="是否付款" align="center" prop="isPay" />
      <el-table-column label="付款日期" align="center" prop="payDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.payDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:orderDetail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:orderDetail:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改orderDetail对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="费用ID" prop="feeId">
          <el-input v-model="form.feeId" placeholder="请输入费用ID" />
        </el-form-item>
        <el-form-item label="专利申请号" prop="applyId">
          <el-input v-model="form.applyId" placeholder="请输入专利申请号" />
        </el-form-item>
        <el-form-item label="专利名称" prop="applyName">
          <el-input v-model="form.applyName" placeholder="请输入专利名称" />
        </el-form-item>
        <el-form-item label="每单应缴消费" prop="money">
          <el-input v-model="form.money" placeholder="请输入每单应缴消费" />
        </el-form-item>
        <el-form-item label="费用描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入费用描述" />
        </el-form-item>
        <el-form-item label="快递单号" prop="expressNum">
          <el-input v-model="form.expressNum" placeholder="请输入快递单号" />
        </el-form-item>
        <el-form-item label="是否付款" prop="isPay">
          <el-input v-model="form.isPay" placeholder="请输入是否付款" />
        </el-form-item>
        <el-form-item label="付款日期" prop="payDate">
          <el-date-picker clearable size="small"
            v-model="form.payDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择付款日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOrderDetail, getOrderDetail, delOrderDetail, addOrderDetail, updateOrderDetail, exportOrderDetail } from "@/api/manager/orderDetail";

export default {
  name: "OrderDetail",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // orderDetail表格数据
      orderDetailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderId: null,
        feeId: null,
        applyId: null,
        applyName: null,
        money: null,
        description: null,
        expressNum: null,
        isPay: null,
        payDate: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createTime: [
          { required: true, message: "下单时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询orderDetail列表 */
    getList() {
      this.loading = true;
      listOrderDetail(this.queryParams).then(response => {
        this.orderDetailList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        orderId: null,
        feeId: null,
        applyId: null,
        applyName: null,
        money: null,
        description: null,
        expressNum: null,
        isPay: null,
        payDate: null,
        createTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加orderDetail";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOrderDetail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改orderDetail";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOrderDetail(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrderDetail(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除orderDetail编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOrderDetail(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有orderDetail数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportOrderDetail(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
