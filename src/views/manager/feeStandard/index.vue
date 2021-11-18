<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="机构ID" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入机构ID"
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
      <el-form-item label="快递费" prop="expressFee">
        <el-input
          v-model="queryParams.expressFee"
          placeholder="请输入快递费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="加急费" prop="urgentFee">
        <el-input
          v-model="queryParams.urgentFee"
          placeholder="请输入加急费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="累加费用" prop="totalFee">
        <el-input
          v-model="queryParams.totalFee"
          placeholder="请输入累加费用"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否设为默认账户" prop="isDefault">
        <el-input
          v-model="queryParams.isDefault"
          placeholder="请输入是否设为默认账户"
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
          v-hasPermi="['manager:feeStandard:add']"
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
          v-hasPermi="['manager:feeStandard:edit']"
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
          v-hasPermi="['manager:feeStandard:remove']"
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
          v-hasPermi="['manager:feeStandard:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="feeStandardList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="收费标准ID" align="center" prop="standardId" />
      <el-table-column label="机构ID" align="center" prop="parentId" />
      <el-table-column label="服务费" align="center" prop="serviceFee" />
      <el-table-column label="快递费" align="center" prop="expressFee" />
      <el-table-column label="加急费" align="center" prop="urgentFee" />
      <el-table-column label="累加费用" align="center" prop="totalFee" />
      <el-table-column label="是否设为默认账户" align="center" prop="isDefault" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:feeStandard:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:feeStandard:remove']"
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

    <!-- 添加或修改feeStandard对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="机构ID" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入机构ID" />
        </el-form-item>
        <el-form-item label="服务费" prop="serviceFee">
          <el-input v-model="form.serviceFee" placeholder="请输入服务费" />
        </el-form-item>
        <el-form-item label="快递费" prop="expressFee">
          <el-input v-model="form.expressFee" placeholder="请输入快递费" />
        </el-form-item>
        <el-form-item label="加急费" prop="urgentFee">
          <el-input v-model="form.urgentFee" placeholder="请输入加急费" />
        </el-form-item>
        <el-form-item label="累加费用" prop="totalFee">
          <el-input v-model="form.totalFee" placeholder="请输入累加费用" />
        </el-form-item>
        <el-form-item label="是否设为默认账户" prop="isDefault">
          <el-input v-model="form.isDefault" placeholder="请输入是否设为默认账户" />
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
import { listFeeStandard, getFeeStandard, delFeeStandard, addFeeStandard, updateFeeStandard, exportFeeStandard } from "@/api/manager/feeStandard";

export default {
  name: "FeeStandard",
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
      // feeStandard表格数据
      feeStandardList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parentId: null,
        serviceFee: null,
        expressFee: null,
        urgentFee: null,
        totalFee: null,
        isDefault: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [
          { required: true, message: "机构ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询feeStandard列表 */
    getList() {
      this.loading = true;
      listFeeStandard(this.queryParams).then(response => {
        this.feeStandardList = response.rows;
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
        standardId: null,
        parentId: null,
        serviceFee: null,
        expressFee: null,
        urgentFee: null,
        totalFee: null,
        isDefault: null
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
      this.ids = selection.map(item => item.standardId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加feeStandard";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const standardId = row.standardId || this.ids
      getFeeStandard(standardId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改feeStandard";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.standardId != null) {
            updateFeeStandard(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFeeStandard(this.form).then(response => {
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
      const standardIds = row.standardId || this.ids;
      this.$confirm('是否确认删除feeStandard编号为"' + standardIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFeeStandard(standardIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有feeStandard数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportFeeStandard(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
