<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="专利申请号" prop="applyId">
        <el-input
          v-model="queryParams.applyId"
          placeholder="请输入专利申请号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="费用类型" prop="feeType">
        <el-select v-model="queryParams.feeType" placeholder="请选择费用类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="需要缴费的金额" prop="money">
        <el-input
          v-model="queryParams.money"
          placeholder="请输入需要缴费的金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="有标记表示费用绑定" prop="tag">
        <el-input
          v-model="queryParams.tag"
          placeholder="请输入有标记表示费用绑定"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已缴费用的付款人" prop="payer">
        <el-input
          v-model="queryParams.payer"
          placeholder="请输入已缴费用的付款人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已缴费用的收据号" prop="receiptNum">
        <el-input
          v-model="queryParams.receiptNum"
          placeholder="请输入已缴费用的收据号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理机构" prop="agency">
        <el-input
          v-model="queryParams.agency"
          placeholder="请输入代理机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="缴费状态" prop="isPay">
        <el-input
          v-model="queryParams.isPay"
          placeholder="请输入缴费状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="监控状态" prop="isMonitor">
        <el-input
          v-model="queryParams.isMonitor"
          placeholder="请输入监控状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所有费用最终缴费日期" prop="endDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择所有费用最终缴费日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="滞纳金最后缴费日期" prop="lateFeeDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.lateFeeDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择滞纳金最后缴费日期">
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
          v-hasPermi="['manager:fee:add']"
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
          v-hasPermi="['manager:fee:edit']"
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
          v-hasPermi="['manager:fee:remove']"
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
          v-hasPermi="['manager:fee:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="feeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="滞纳金最后缴费日期" align="center" prop="feeId" />
      <el-table-column label="专利申请号" align="center" prop="applyId" />
      <el-table-column label="费用类型" align="center" prop="feeType" />
      <el-table-column label="需要缴费的金额" align="center" prop="money" />
      <el-table-column label="有标记表示费用绑定" align="center" prop="tag" />
      <el-table-column label="已缴费用的付款人" align="center" prop="payer" />
      <el-table-column label="已缴费用的收据号" align="center" prop="receiptNum" />
      <el-table-column label="代理机构" align="center" prop="agency" />
      <el-table-column label="描述" align="center" prop="remark" />
      <el-table-column label="缴费状态" align="center" prop="isPay" />
      <el-table-column label="监控状态" align="center" prop="isMonitor" />
      <el-table-column label="所有费用最终缴费日期" align="center" prop="endDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="滞纳金最后缴费日期" align="center" prop="lateFeeDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lateFeeDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:fee:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:fee:remove']"
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

    <!-- 添加或修改fee对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="专利申请号" prop="applyId">
          <el-input v-model="form.applyId" placeholder="请输入专利申请号" />
        </el-form-item>
        <el-form-item label="费用类型" prop="feeType">
          <el-select v-model="form.feeType" placeholder="请选择费用类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="需要缴费的金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入需要缴费的金额" />
        </el-form-item>
        <el-form-item label="有标记表示费用绑定" prop="tag">
          <el-input v-model="form.tag" placeholder="请输入有标记表示费用绑定" />
        </el-form-item>
        <el-form-item label="已缴费用的付款人" prop="payer">
          <el-input v-model="form.payer" placeholder="请输入已缴费用的付款人" />
        </el-form-item>
        <el-form-item label="已缴费用的收据号" prop="receiptNum">
          <el-input v-model="form.receiptNum" placeholder="请输入已缴费用的收据号" />
        </el-form-item>
        <el-form-item label="代理机构" prop="agency">
          <el-input v-model="form.agency" placeholder="请输入代理机构" />
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="缴费状态" prop="isPay">
          <el-input v-model="form.isPay" placeholder="请输入缴费状态" />
        </el-form-item>
        <el-form-item label="监控状态" prop="isMonitor">
          <el-input v-model="form.isMonitor" placeholder="请输入监控状态" />
        </el-form-item>
        <el-form-item label="所有费用最终缴费日期" prop="endDate">
          <el-date-picker clearable size="small"
            v-model="form.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择所有费用最终缴费日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="滞纳金最后缴费日期" prop="lateFeeDate">
          <el-date-picker clearable size="small"
            v-model="form.lateFeeDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择滞纳金最后缴费日期">
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
import { listFee, getFee, delFee, addFee, updateFee, exportFee } from "@/api/manager/fee";

export default {
  name: "Fee",
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
      // fee表格数据
      feeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        applyId: null,
        feeType: null,
        money: null,
        tag: null,
        payer: null,
        receiptNum: null,
        agency: null,
        isPay: null,
        isMonitor: null,
        endDate: null,
        lateFeeDate: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        remark: [
          { required: true, message: "描述不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询fee列表 */
    getList() {
      this.loading = true;
      listFee(this.queryParams).then(response => {
        this.feeList = response.rows;
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
        feeId: null,
        applyId: null,
        feeType: null,
        money: null,
        tag: null,
        payer: null,
        receiptNum: null,
        agency: null,
        remark: null,
        isPay: null,
        isMonitor: null,
        endDate: null,
        lateFeeDate: null,
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
      this.ids = selection.map(item => item.feeId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加fee";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const feeId = row.feeId || this.ids
      getFee(feeId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改fee";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.feeId != null) {
            updateFee(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFee(this.form).then(response => {
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
      const feeIds = row.feeId || this.ids;
      this.$confirm('是否确认删除fee编号为"' + feeIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFee(feeIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有fee数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportFee(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
