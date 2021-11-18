<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="开票机构" prop="agenName">
        <el-input
          v-model="queryParams.agenName"
          placeholder="请输入开票机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="票据代码" prop="billBatchCode">
        <el-input
          v-model="queryParams.billBatchCode"
          placeholder="请输入票据代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开票日期" prop="billDate">
        <el-input
          v-model="queryParams.billDate"
          placeholder="请输入开票日期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="票据号码" prop="billNo">
        <el-input
          v-model="queryParams.billNo"
          placeholder="请输入票据号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请号" prop="busNo">
        <el-input
          v-model="queryParams.busNo"
          placeholder="请输入申请号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="未知" prop="fbillNature">
        <el-input
          v-model="queryParams.fbillNature"
          placeholder="请输入未知"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="未知" prop="idCard">
        <el-input
          v-model="queryParams.idCard"
          placeholder="请输入未知"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="详情信息" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入详情信息"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款日期" prop="payDate">
        <el-input
          v-model="queryParams.payDate"
          placeholder="请输入付款日期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="缴费人" prop="payer">
        <el-input
          v-model="queryParams.payer"
          placeholder="请输入缴费人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="随机数" prop="random">
        <el-input
          v-model="queryParams.random"
          placeholder="请输入随机数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="红票票号" prop="redBillNo">
        <el-input
          v-model="queryParams.redBillNo"
          placeholder="请输入红票票号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="相关红票票号" prop="relatedBillNo">
        <el-input
          v-model="queryParams.relatedBillNo"
          placeholder="请输入相关红票票号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="票据状态" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入票据状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="取票码" prop="takingCode">
        <el-input
          v-model="queryParams.takingCode"
          placeholder="请输入取票码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开票金额" prop="totalAmt">
        <el-input
          v-model="queryParams.totalAmt"
          placeholder="请输入开票金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="票据名称" prop="billName">
        <el-input
          v-model="queryParams.billName"
          placeholder="请输入票据名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="缴费人(备用)" prop="payerA">
        <el-input
          v-model="queryParams.payerA"
          placeholder="请输入缴费人(备用)"
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
          v-hasPermi="['manager:invoice:add']"
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
          v-hasPermi="['manager:invoice:edit']"
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
          v-hasPermi="['manager:invoice:remove']"
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
          v-hasPermi="['manager:invoice:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="invoiceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="发票ID" align="center" prop="invoiceId" />
      <el-table-column label="开票机构" align="center" prop="agenName" />
      <el-table-column label="票据代码" align="center" prop="billBatchCode" />
      <el-table-column label="开票日期" align="center" prop="billDate" />
      <el-table-column label="票据号码" align="center" prop="billNo" />
      <el-table-column label="申请号" align="center" prop="busNo" />
      <el-table-column label="未知" align="center" prop="fbillNature" />
      <el-table-column label="未知" align="center" prop="idCard" />
      <el-table-column label="详情信息" align="center" prop="memo" />
      <el-table-column label="付款日期" align="center" prop="payDate" />
      <el-table-column label="缴费人" align="center" prop="payer" />
      <el-table-column label="随机数" align="center" prop="random" />
      <el-table-column label="红票票号" align="center" prop="redBillNo" />
      <el-table-column label="相关红票票号" align="center" prop="relatedBillNo" />
      <el-table-column label="票据状态" align="center" prop="state" />
      <el-table-column label="取票码" align="center" prop="takingCode" />
      <el-table-column label="开票金额" align="center" prop="totalAmt" />
      <el-table-column label="票据名称" align="center" prop="billName" />
      <el-table-column label="图片地址" align="center" prop="imgBase64" />
      <el-table-column label="缴费人(备用)" align="center" prop="payerA" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:invoice:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:invoice:remove']"
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

    <!-- 添加或修改invoice对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="开票机构" prop="agenName">
          <el-input v-model="form.agenName" placeholder="请输入开票机构" />
        </el-form-item>
        <el-form-item label="票据代码" prop="billBatchCode">
          <el-input v-model="form.billBatchCode" placeholder="请输入票据代码" />
        </el-form-item>
        <el-form-item label="开票日期" prop="billDate">
          <el-input v-model="form.billDate" placeholder="请输入开票日期" />
        </el-form-item>
        <el-form-item label="票据号码" prop="billNo">
          <el-input v-model="form.billNo" placeholder="请输入票据号码" />
        </el-form-item>
        <el-form-item label="申请号" prop="busNo">
          <el-input v-model="form.busNo" placeholder="请输入申请号" />
        </el-form-item>
        <el-form-item label="未知" prop="fbillNature">
          <el-input v-model="form.fbillNature" placeholder="请输入未知" />
        </el-form-item>
        <el-form-item label="未知" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入未知" />
        </el-form-item>
        <el-form-item label="详情信息" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入详情信息" />
        </el-form-item>
        <el-form-item label="付款日期" prop="payDate">
          <el-input v-model="form.payDate" placeholder="请输入付款日期" />
        </el-form-item>
        <el-form-item label="缴费人" prop="payer">
          <el-input v-model="form.payer" placeholder="请输入缴费人" />
        </el-form-item>
        <el-form-item label="随机数" prop="random">
          <el-input v-model="form.random" placeholder="请输入随机数" />
        </el-form-item>
        <el-form-item label="红票票号" prop="redBillNo">
          <el-input v-model="form.redBillNo" placeholder="请输入红票票号" />
        </el-form-item>
        <el-form-item label="相关红票票号" prop="relatedBillNo">
          <el-input v-model="form.relatedBillNo" placeholder="请输入相关红票票号" />
        </el-form-item>
        <el-form-item label="票据状态" prop="state">
          <el-input v-model="form.state" placeholder="请输入票据状态" />
        </el-form-item>
        <el-form-item label="取票码" prop="takingCode">
          <el-input v-model="form.takingCode" placeholder="请输入取票码" />
        </el-form-item>
        <el-form-item label="开票金额" prop="totalAmt">
          <el-input v-model="form.totalAmt" placeholder="请输入开票金额" />
        </el-form-item>
        <el-form-item label="票据名称" prop="billName">
          <el-input v-model="form.billName" placeholder="请输入票据名称" />
        </el-form-item>
        <el-form-item label="图片地址" prop="imgBase64">
          <el-input v-model="form.imgBase64" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="缴费人(备用)" prop="payerA">
          <el-input v-model="form.payerA" placeholder="请输入缴费人(备用)" />
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
import { listInvoice, getInvoice, delInvoice, addInvoice, updateInvoice, exportInvoice } from "@/api/manager/invoice";

export default {
  name: "Invoice",
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
      // invoice表格数据
      invoiceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        agenName: null,
        billBatchCode: null,
        billDate: null,
        billNo: null,
        busNo: null,
        fbillNature: null,
        idCard: null,
        memo: null,
        payDate: null,
        payer: null,
        random: null,
        redBillNo: null,
        relatedBillNo: null,
        state: null,
        takingCode: null,
        totalAmt: null,
        billName: null,
        imgBase64: null,
        payerA: null
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
    /** 查询invoice列表 */
    getList() {
      this.loading = true;
      listInvoice(this.queryParams).then(response => {
        this.invoiceList = response.rows;
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
        invoiceId: null,
        agenName: null,
        billBatchCode: null,
        billDate: null,
        billNo: null,
        busNo: null,
        fbillNature: null,
        idCard: null,
        memo: null,
        payDate: null,
        payer: null,
        random: null,
        redBillNo: null,
        relatedBillNo: null,
        state: null,
        takingCode: null,
        totalAmt: null,
        billName: null,
        imgBase64: null,
        payerA: null
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
      this.ids = selection.map(item => item.invoiceId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加invoice";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const invoiceId = row.invoiceId || this.ids
      getInvoice(invoiceId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改invoice";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.invoiceId != null) {
            updateInvoice(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInvoice(this.form).then(response => {
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
      const invoiceIds = row.invoiceId || this.ids;
      this.$confirm('是否确认删除invoice编号为"' + invoiceIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delInvoice(invoiceIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有invoice数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportInvoice(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
