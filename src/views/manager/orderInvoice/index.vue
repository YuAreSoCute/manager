<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="订单id" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发票类型" prop="isVat">
        <el-input
          v-model="queryParams.isVat"
          placeholder="请输入发票类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发票抬头" prop="invoiceTitle">
        <el-input
          v-model="queryParams.invoiceTitle"
          placeholder="请输入发票抬头"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发票金额" prop="invoiceAmount">
        <el-input
          v-model="queryParams.invoiceAmount"
          placeholder="请输入发票金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发票税号" prop="invoiceTaxNo">
        <el-input
          v-model="queryParams.invoiceTaxNo"
          placeholder="请输入发票税号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开票税金" prop="invoiceTax">
        <el-input
          v-model="queryParams.invoiceTax"
          placeholder="请输入开票税金"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司名称[增值税]" prop="vatCompanyName">
        <el-input
          v-model="queryParams.vatCompanyName"
          placeholder="请输入公司名称[增值税]"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司地址[增值税]" prop="vatCompanyAddress">
        <el-input
          v-model="queryParams.vatCompanyAddress"
          placeholder="请输入公司地址[增值税]"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系电话[增值税]" prop="vatTelphone">
        <el-input
          v-model="queryParams.vatTelphone"
          placeholder="请输入联系电话[增值税]"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开户行[增值税]" prop="vatBankName">
        <el-input
          v-model="queryParams.vatBankName"
          placeholder="请输入开户行[增值税]"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行账号[增值税]" prop="vatBankAccount">
        <el-input
          v-model="queryParams.vatBankAccount"
          placeholder="请输入银行账号[增值税]"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="官方发票抬头" prop="officialInvoiceTitle">
        <el-input
          v-model="queryParams.officialInvoiceTitle"
          placeholder="请输入官方发票抬头"
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
          v-hasPermi="['manager:orderInvoice:add']"
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
          v-hasPermi="['manager:orderInvoice:edit']"
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
          v-hasPermi="['manager:orderInvoice:remove']"
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
          v-hasPermi="['manager:orderInvoice:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="orderInvoiceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单发票关联ID" align="center" prop="orderInvoiceId" />
      <el-table-column label="订单id" align="center" prop="orderId" />
      <el-table-column label="发票类型" align="center" prop="isVat" />
      <el-table-column label="发票抬头" align="center" prop="invoiceTitle" />
      <el-table-column label="发票内容" align="center" prop="invoiceContent" />
      <el-table-column label="发票金额" align="center" prop="invoiceAmount" />
      <el-table-column label="发票税号" align="center" prop="invoiceTaxNo" />
      <el-table-column label="开票税金" align="center" prop="invoiceTax" />
      <el-table-column label="公司名称[增值税]" align="center" prop="vatCompanyName" />
      <el-table-column label="公司地址[增值税]" align="center" prop="vatCompanyAddress" />
      <el-table-column label="联系电话[增值税]" align="center" prop="vatTelphone" />
      <el-table-column label="开户行[增值税]" align="center" prop="vatBankName" />
      <el-table-column label="银行账号[增值税]" align="center" prop="vatBankAccount" />
      <el-table-column label="官方发票抬头" align="center" prop="officialInvoiceTitle" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:orderInvoice:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:orderInvoice:remove']"
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

    <!-- 添加或修改orderInvoice对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单id" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单id" />
        </el-form-item>
        <el-form-item label="发票类型" prop="isVat">
          <el-input v-model="form.isVat" placeholder="请输入发票类型" />
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoiceTitle">
          <el-input v-model="form.invoiceTitle" placeholder="请输入发票抬头" />
        </el-form-item>
        <el-form-item label="发票内容">
          <editor v-model="form.invoiceContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="发票金额" prop="invoiceAmount">
          <el-input v-model="form.invoiceAmount" placeholder="请输入发票金额" />
        </el-form-item>
        <el-form-item label="发票税号" prop="invoiceTaxNo">
          <el-input v-model="form.invoiceTaxNo" placeholder="请输入发票税号" />
        </el-form-item>
        <el-form-item label="开票税金" prop="invoiceTax">
          <el-input v-model="form.invoiceTax" placeholder="请输入开票税金" />
        </el-form-item>
        <el-form-item label="公司名称[增值税]" prop="vatCompanyName">
          <el-input v-model="form.vatCompanyName" placeholder="请输入公司名称[增值税]" />
        </el-form-item>
        <el-form-item label="公司地址[增值税]" prop="vatCompanyAddress">
          <el-input v-model="form.vatCompanyAddress" placeholder="请输入公司地址[增值税]" />
        </el-form-item>
        <el-form-item label="联系电话[增值税]" prop="vatTelphone">
          <el-input v-model="form.vatTelphone" placeholder="请输入联系电话[增值税]" />
        </el-form-item>
        <el-form-item label="开户行[增值税]" prop="vatBankName">
          <el-input v-model="form.vatBankName" placeholder="请输入开户行[增值税]" />
        </el-form-item>
        <el-form-item label="银行账号[增值税]" prop="vatBankAccount">
          <el-input v-model="form.vatBankAccount" placeholder="请输入银行账号[增值税]" />
        </el-form-item>
        <el-form-item label="官方发票抬头" prop="officialInvoiceTitle">
          <el-input v-model="form.officialInvoiceTitle" placeholder="请输入官方发票抬头" />
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
import { listOrderInvoice, getOrderInvoice, delOrderInvoice, addOrderInvoice, updateOrderInvoice, exportOrderInvoice } from "@/api/manager/orderInvoice";

export default {
  name: "OrderInvoice",
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
      // orderInvoice表格数据
      orderInvoiceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderId: null,
        isVat: null,
        invoiceTitle: null,
        invoiceContent: null,
        invoiceAmount: null,
        invoiceTaxNo: null,
        invoiceTax: null,
        vatCompanyName: null,
        vatCompanyAddress: null,
        vatTelphone: null,
        vatBankName: null,
        vatBankAccount: null,
        officialInvoiceTitle: null,
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
    /** 查询orderInvoice列表 */
    getList() {
      this.loading = true;
      listOrderInvoice(this.queryParams).then(response => {
        this.orderInvoiceList = response.rows;
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
        orderInvoiceId: null,
        orderId: null,
        isVat: null,
        invoiceTitle: null,
        invoiceContent: null,
        invoiceAmount: null,
        invoiceTaxNo: null,
        invoiceTax: null,
        vatCompanyName: null,
        vatCompanyAddress: null,
        vatTelphone: null,
        vatBankName: null,
        vatBankAccount: null,
        officialInvoiceTitle: null,
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
      this.ids = selection.map(item => item.orderInvoiceId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加orderInvoice";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const orderInvoiceId = row.orderInvoiceId || this.ids
      getOrderInvoice(orderInvoiceId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改orderInvoice";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.orderInvoiceId != null) {
            updateOrderInvoice(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrderInvoice(this.form).then(response => {
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
      const orderInvoiceIds = row.orderInvoiceId || this.ids;
      this.$confirm('是否确认删除orderInvoice编号为"' + orderInvoiceIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOrderInvoice(orderInvoiceIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有orderInvoice数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportOrderInvoice(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
