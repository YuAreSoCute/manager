<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机构id" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入机构id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单编号" prop="orderNumber">
        <el-input
          v-model="queryParams.orderNumber"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户名称" prop="payer">
        <el-input
          v-model="queryParams.payer"
          placeholder="请输入用户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务费" prop="serviceFee">
        <el-input
          v-model="queryParams.serviceFee"
          placeholder="请输入服务费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="加急费" prop="emergencyFee">
        <el-input
          v-model="queryParams.emergencyFee"
          placeholder="请输入加急费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="快递费" prop="expressFee">
        <el-input
          v-model="queryParams.expressFee"
          placeholder="请输入快递费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="应缴费用" prop="totalFee">
        <el-input
          v-model="queryParams.totalFee"
          placeholder="请输入应缴费用"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款方式" prop="manner">
        <el-input
          v-model="queryParams.manner"
          placeholder="请输入付款方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单状态" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入订单状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否下载了Excel表格" prop="isDownload">
        <el-input
          v-model="queryParams.isDownload"
          placeholder="请输入是否下载了Excel表格"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开户行" prop="openingBank">
        <el-input
          v-model="queryParams.openingBank"
          placeholder="请输入开户行"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="账号" prop="accountNumber">
        <el-input
          v-model="queryParams.accountNumber"
          placeholder="请输入账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公共账号" prop="publicAccount">
        <el-input
          v-model="queryParams.publicAccount"
          placeholder="请输入公共账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['manager:order:add']"
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
          v-hasPermi="['manager:order:edit']"
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
          v-hasPermi="['manager:order:remove']"
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
          v-hasPermi="['manager:order:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单id" align="center" prop="orderId" />
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column label="机构id" align="center" prop="parentId" />
      <el-table-column label="订单编号" align="center" prop="orderNumber" />
      <el-table-column label="用户名称" align="center" prop="payer" />
      <el-table-column label="服务费" align="center" prop="serviceFee" />
      <el-table-column label="加急费" align="center" prop="emergencyFee" />
      <el-table-column label="快递费" align="center" prop="expressFee" />
      <el-table-column label="应缴费用" align="center" prop="totalFee" />
      <el-table-column label="付款方式" align="center" prop="manner" />
      <el-table-column label="订单状态" align="center" prop="state" />
      <el-table-column label="是否下载了Excel表格" align="center" prop="isDownload" />
      <el-table-column label="开户行" align="center" prop="openingBank" />
      <el-table-column label="账号" align="center" prop="accountNumber" />
      <el-table-column label="公共账号" align="center" prop="publicAccount" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:order:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:order:remove']"
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

    <!-- 添加或修改order对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="机构id" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入机构id" />
        </el-form-item>
        <el-form-item label="订单编号" prop="orderNumber">
          <el-input v-model="form.orderNumber" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="用户名称" prop="payer">
          <el-input v-model="form.payer" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="服务费" prop="serviceFee">
          <el-input v-model="form.serviceFee" placeholder="请输入服务费" />
        </el-form-item>
        <el-form-item label="加急费" prop="emergencyFee">
          <el-input v-model="form.emergencyFee" placeholder="请输入加急费" />
        </el-form-item>
        <el-form-item label="快递费" prop="expressFee">
          <el-input v-model="form.expressFee" placeholder="请输入快递费" />
        </el-form-item>
        <el-form-item label="应缴费用" prop="totalFee">
          <el-input v-model="form.totalFee" placeholder="请输入应缴费用" />
        </el-form-item>
        <el-form-item label="付款方式" prop="manner">
          <el-input v-model="form.manner" placeholder="请输入付款方式" />
        </el-form-item>
        <el-form-item label="订单状态" prop="state">
          <el-input v-model="form.state" placeholder="请输入订单状态" />
        </el-form-item>
        <el-form-item label="是否下载了Excel表格" prop="isDownload">
          <el-input v-model="form.isDownload" placeholder="请输入是否下载了Excel表格" />
        </el-form-item>
        <el-form-item label="开户行" prop="openingBank">
          <el-input v-model="form.openingBank" placeholder="请输入开户行" />
        </el-form-item>
        <el-form-item label="账号" prop="accountNumber">
          <el-input v-model="form.accountNumber" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="公共账号" prop="publicAccount">
          <el-input v-model="form.publicAccount" placeholder="请输入公共账号" />
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
import { listOrder, getOrder, delOrder, addOrder, updateOrder, exportOrder } from "@/api/manager/order";

export default {
  name: "Order",
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
      // order表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        parentId: null,
        orderNumber: null,
        payer: null,
        serviceFee: null,
        emergencyFee: null,
        expressFee: null,
        totalFee: null,
        manner: null,
        state: null,
        isDownload: null,
        openingBank: null,
        accountNumber: null,
        publicAccount: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询order列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        this.orderList = response.rows;
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
        orderId: null,
        userId: null,
        parentId: null,
        orderNumber: null,
        payer: null,
        serviceFee: null,
        emergencyFee: null,
        expressFee: null,
        totalFee: null,
        manner: null,
        state: null,
        isDownload: null,
        openingBank: null,
        accountNumber: null,
        publicAccount: null,
        createTime: null,
        updateTime: null
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
      this.ids = selection.map(item => item.orderId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加order";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const orderId = row.orderId || this.ids
      getOrder(orderId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改order";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.orderId != null) {
            updateOrder(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrder(this.form).then(response => {
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
      const orderIds = row.orderId || this.ids;
      this.$confirm('是否确认删除order编号为"' + orderIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOrder(orderIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有order数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
